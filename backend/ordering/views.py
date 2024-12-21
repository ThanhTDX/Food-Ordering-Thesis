import io
import os
from dotenv import load_dotenv
load_dotenv()
import logging

from django.shortcuts import render
from django.conf import settings
from django.utils import timezone
from django.core.files import File
from django.http import FileResponse, HttpResponse

from base.models import *
from ordering.models import *
from payment.models import *

from rest_framework.decorators import api_view , permission_classes
from rest_framework.response import Response
from ordering.serializers import *

from rest_framework import status

from datetime import datetime



import json
import uuid
import requests
import hmac
import hashlib


from paypalserversdk.http.auth.o_auth_2 import ClientCredentialsAuthCredentials
from paypalserversdk.logging.configuration.api_logging_configuration import (
    LoggingConfiguration,
    RequestLoggingConfiguration,
    ResponseLoggingConfiguration,
)
from paypalserversdk.paypal_serversdk_client import PaypalServersdkClient
from paypalserversdk.controllers.orders_controller import OrdersController
from paypalserversdk.controllers.payments_controller import PaymentsController
from paypalserversdk.models.amount_with_breakdown import AmountWithBreakdown
from paypalserversdk.models.checkout_payment_intent import CheckoutPaymentIntent
from paypalserversdk.models.order_request import OrderRequest
from paypalserversdk.models.capture_request import CaptureRequest
from paypalserversdk.models.money import Money
from paypalserversdk.models.shipping_details import ShippingDetails
from paypalserversdk.models.shipping_option import ShippingOption
from paypalserversdk.models.shipping_type import ShippingType
from paypalserversdk.models.purchase_unit_request import PurchaseUnitRequest
from paypalserversdk.models.payment_source import PaymentSource
from paypalserversdk.models.card_request import CardRequest
from paypalserversdk.models.card_attributes import CardAttributes
from paypalserversdk.models.card_verification import CardVerification
from paypalserversdk.models.card_verification_method import CardVerificationMethod
from paypalserversdk.api_helper import ApiHelper

# Create your views here.

# /api/ordering/
@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/ordering/',
    '/api/ordering/all/',
    '/api/ordering/create/',
    '/api/ordering/bill/<:id>/',
    '/api/ordering/<str:pk>/',
    
    '/api/ordering/momo/payment/',
    '/api/ordering/momo/webhooks/callback',
    '/api/ordering/paypal/payment_creation/',
    '/api/ordering/paypal/approve_callback/',
    '/api/ordering/paypal/webhooks/payment_received/',
    
  ]
  return Response(routes)

# /api/ordering/all/
@api_view(['GET'])
def getAllOrdering(request):
  data = Ordering.objects.all()
  serializer = OrderingSerializer(data, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# /api/ordering/<id>/
@api_view(['GET'])
def getOrderingById(request, pk):
  data = Ordering.objects.get(_id=pk)
  serializer = OrderingSerializer(data, many=False)
  return Response(serializer.data, status=status.HTTP_200_OK)


# /api/ordering/momo/webhooks/callback
@api_view(['POST'])
def orderingPaymentMomo(request):
  # unloads request content
  request_data = json.loads(request.body)
  phone_number = request_data.get('phoneNumber')
  price = request_data.get('price')
  
  # parameters send to MoMo get get payUrl
  # Business related parameters
  endpoint = "https://test-payment.momo.vn/v2/gateway/api/create" # test environment
  accessKey = os.getenv("MOMO_ACCESS_KEY")
  secretKey = os.getenv("MOMO_SECRET_KEY")
  partnerCode = os.getenv("MOMO_PARTNER_CODE")
  partnerName = "Thanh's Deli"
  
  # Order specific 
  orderInfo = "Ordering for " + str(phone_number)
  redirectUrl = "http://localhost:3000/order"
  ipnUrl = "https://78ce-2001-ee0-50c7-b710-4510-42c6-2f07-74d.ngrok-free.app/api/ordering/momo/webhooks/callback"
  amount = str(price)
  orderId = str(uuid.uuid4())
  requestId = str(uuid.uuid4())
  extraData = ""  # pass empty value or Encode base64 JsonString
  requestType = "payWithMethod"
  storeId = "Test Store"
  orderGroupId = ""
  autoCapture = True
  lang = "en"
  orderGroupId = ""

  # before sign HMAC SHA256 with format: accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl
  # &orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId
  # &requestType=$requestType
  rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId \
                + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl\
                + "&requestId=" + requestId + "&requestType=" + requestType

  # puts raw signature
  # print("--------------------RAW SIGNATURE----------------")
  # print(rawSignature)
  # signature
  h = hmac.new(bytes(secretKey, 'ascii'), bytes(rawSignature, 'ascii'), hashlib.sha256)
  signature = h.hexdigest()
  # print("--------------------SIGNATURE----------------")
  # print(signature)

  # json object send to MoMo endpoint

  data = {
      'partnerCode': partnerCode,
      'orderId': orderId,
      'partnerName': partnerName,
      'storeId': storeId,
      'ipnUrl': ipnUrl,
      'amount': amount,
      'lang': lang,
      'requestType': requestType,
      'redirectUrl': redirectUrl,
      'autoCapture': autoCapture,
      'orderInfo': orderInfo,
      'requestId': requestId,
      'extraData': extraData,
      'signature': signature,
      'orderGroupId': orderGroupId
  }

  # print("--------------------JSON REQUEST----------------\n")
  data = json.dumps(data)
  # print(data)

  try:
    clen = len(data)
    response = requests.post(endpoint, data=data, headers={'Content-Type': 'application/json', 'Content-Length': str(clen)})
    response_data = response.json()
    
    # Filter the response to only send back links, amount and orderId
    filtered_response = {
      'orderId': response_data.get('orderId'),
      'amount': response_data.get('amount'),
      'payUrl': response_data.get('payUrl'),
      'shortLink': response_data.get('shortLink')
    }
    # # f.close()
    # print("--------------------JSON response----------------\n")
    # print(response.json())

    # Create payment instance in Django
    new_payment = Payment()
    new_payment.phone_number = phone_number
    new_payment.amount = price
    new_payment.status = Payment.STATUSES.PENDING
    new_payment.time_created = timezone.now()
    new_payment.order_id = response_data.get('orderId')
    new_payment.save()
    
    # Adding payment infomation: MOMO
    payment_information = PaymentInformation()
    payment_information.payment = new_payment
    payment_information.payment_method = "MOMO"
    payment_information.data = response_data
    payment_information.save()    
    
    return Response({'status': 'Payment request initiated', 'data': filtered_response}, status=status.HTTP_200_OK)
  except Exception as e:
    print(e)
    return Response({'status': 'Payment request failed', 'error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  
# /api/ordering/momo/callback
@api_view(['POST'])
def orderingPaymentMomoCallback(request):

  print("--------------------MOMO CALLBACK----------------\n")
  request_data = json.loads(request.body)
  
  payment = Payment.objects.get(order_id=request_data.get('orderId'))
  
  # https://developers.momo.vn/v3/docs/payment/api/result-handling/resultcode
  if request_data.get('resultCode') == 0 :
    payment.status = Payment.STATUSES.SUCCESSFUL
  elif request_data.get('resultCode') > 1000:
    payment.status = Payment.STATUSES.CANCELLED
    
  payment.save()
  
  return Response(status=status.HTTP_204_NO_CONTENT)



########################################################################
#############################   PAYPAL   ###############################
########################################################################

paypal_client: PaypalServersdkClient = PaypalServersdkClient(
    client_credentials_auth_credentials=ClientCredentialsAuthCredentials(
        o_auth_client_id=os.getenv("PAYPAL_CLIENT_ID"),
        o_auth_client_secret=os.getenv("PAYPAL_CLIENT_SECRET"),
    ),
    logging_configuration=LoggingConfiguration(
        log_level=logging.INFO,
        # Disable masking of sensitive headers for Sandbox testing.
        # This should be set to True (the default if unset)in production.
        mask_sensitive_headers=False,
        request_logging_config=RequestLoggingConfiguration(
            log_headers=True, log_body=True
        ),
        response_logging_config=ResponseLoggingConfiguration(
            log_headers=True, log_body=True
        ),
    ),
)

orders_controller: OrdersController = paypal_client.orders
payments_controller: PaymentsController = paypal_client.payments

# /api/ordering/paypal/payment_creation/
@api_view(['POST'])
def orderingPaymentPaypal(request):

  def convert_vnd_to_usd(vnd_amount):
    # Get the current exchange rate from VND to USD
    api_url = "https://v6.exchangerate-api.com/v6/c628a77b98c1ccb5132e252a/latest/VND"
    
    # Make a request to the API to get the exchange rate
    response = requests.get(api_url)
    
    if response.status_code == 200:
        # Extract the exchange rate for USD
        data = response.json()
        exchange_rate = data['conversion_rates']['USD']
        
        # Convert the VND amount to USD
        usd_amount = float(vnd_amount) * exchange_rate
        
        # Format the output as a USD string with 2 decimal places
        return f"{usd_amount:.2f}"
    else:
        # Handle API error or unavailable data
        return "Error fetching exchange rate"

  def create_new_payment_instance(response):
    # Create payment instance 
    new_payment = Payment()
    new_payment.phone_number = phone_number
    new_payment.amount = vnd_amount
    new_payment.status = Payment.STATUSES.PENDING
    new_payment.time_created = timezone.now()
    new_payment.order_id = response.get('id') # fetch id from the api call
    new_payment.save()
    
    # Adding payment infomation: PAYPAL
    payment_information = PaymentInformation()
    payment_information.payment = new_payment
    payment_information.payment_method = "PAYPAL"
    payment_information.data = response
    payment_information.save()  
    
  request_data = json.loads(request.body)
  phone_number = request_data.get('phoneNumber')
  vnd_amount = request_data.get('amount')
  usd_amount = convert_vnd_to_usd(vnd_amount)
  
  # use the cart information passed from the front-end to calculate the order amount detals
  
  order = orders_controller.orders_create(
    {
      "body": OrderRequest(
        intent=CheckoutPaymentIntent.CAPTURE,
        purchase_units=[
          PurchaseUnitRequest(
            amount=AmountWithBreakdown(
                currency_code="USD",
                value=usd_amount,
            ),
          )
        ],
      )
    }
  )
  
  # return the values in json format 
  response_data = json.loads(ApiHelper.json_serialize(order.body))
  create_new_payment_instance(response_data)
  
  return Response(response_data, status=status.HTTP_200_OK)

# /api/ordering/paypal/approve_callback/
@api_view(['POST'])
def orderingPaymentPaypalCallback(request):

  print("--------------------PAYPAL CALLBACK----------------\n")
  print(request.body)
  request_data = json.loads(request.body)
  order_id = request_data.get('orderId') 
  print(order_id)   
  
  order = orders_controller.orders_capture(
    {"id": order_id, "prefer": "return=representation"}
  )
  
  response_data = json.loads(ApiHelper.json_serialize(order.body))
  
  # Update payment order in Django
  payment = Payment.objects.get(order_id=order_id)
  # Error handling needed
  payment.status = Payment.STATUSES.SUCCESSFUL
  payment.save()
  
  payment_information = PaymentInformation.objects.get(payment=payment)
  payment_information.data = response_data
  payment_information.save()
  
  return Response(response_data, status=status.HTTP_200_OK)

# /api/ordering/paypal/webhooks/payment_received/
@api_view(['POST'])
def orderingPaymentPaypalWebhooksReceived(request):

  print("--------------------PAYPAL PAYMENT RECEIVED----------------\n")
  print(request.body)
  request_data = json.loads(request.body)
  
  return Response(status=status.HTTP_204_NO_CONTENT)
   



# /api/ordering/create/
@api_view(['POST'])
def orderingCreateNew(request):
  request_data = json.loads(request.body)
  print(request_data)
  
  def create_txt_file(request_data):
    # Create an in-memory file-like object
    file_content = io.StringIO()

    # Write content into the in-memory file
    file_content.write("Thành's Deli Restaurant\n")
    file_content.write("Order number: " + request_data.get("orderId") + "\n")
    file_content.write("Customer Name: " + request_data.get("username") + "\n")
    file_content.write("Phone Number: " + request_data.get("phoneNumber") + "\n")
    file_content.write("Address: " + request_data.get("address") + "\n")
    file_content.write("\n\n")
    file_content.write("Order Items: \n")
    
    counter = 1
    for item in request_data.get("items"):
        file_content.write(str(counter) + ": " + item["name"] + "\n")
        file_content.write("\t" + "Quantity: " + str(item["qty"]) + " \tPrice: " + str(int(item["qty"]) * int(item["price"])) + "VND\n")
        counter += 1
    file_content.write("\n\n")
    file_content.write("Total Price:" + str(request_data.get("price")) + "\n")
    
    # Reset file pointer to the beginning
    file_content.seek(0)

    return file_content
  
  # Create new Ordering in Django and save 
  new_order = Ordering()
  new_order.name = request_data.get("name")
  new_order.phone_number = request_data.get("phoneNumber")
  new_order.price = request_data.get("price")
  new_order.address = request_data.get("address")
  new_order.user_name = request_data.get("username")
  new_order.delivery_time = datetime.strptime(request_data.get("deliveryTime"), "%Y-%m-%d %H:%M")
  new_order.date_created = timezone.now()
  new_order.payment = Payment.objects.get(order_id = request_data.get("orderId"))
  new_order.save()
  
  for item in request_data.get("items"):
    new_food_order = OrderingFood_FK()
    new_food_order.ordering = new_order
    new_food_order.food = Food.objects.get(_id = item.get("_id"))
    new_food_order.qty = item.get("qty")
    new_food_order.save()  
    
  new_bill_file = create_txt_file(request_data)
  new_order.bill = File(new_bill_file, name=request_data.get("orderId") + ".txt")
  new_order.save()
  return Response({'status': 'success'}, status=status.HTTP_200_OK)

# /api/ordering/download_file/<:filename>/
@api_view(['GET'])
def getOrderingBill(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT,'user_files', filename + ".txt")
    if os.path.exists(file_path):
      with open(file_path, 'r') as file:
        file_content = file.read()
        response = HttpResponse(file_content, content_type='text/plain')
        # Set Content-Disposition header to make it downloadable and show filename
        response['Content-Disposition'] = f'attachment; filename="{filename}.txt"'

        return response
    else:
        return Response("File not found", status=status.HTTP_404_NOT_FOUND)