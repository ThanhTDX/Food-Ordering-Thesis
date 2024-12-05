from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('momo/payment/', views.paymentMomo, name="orderingPaymentMomo"),
    path('momo/callback', views.paymentMomoCallback, name="orderingPaymentMomoCallback"),
    path('paypal/payment_creation/', views.orderingPaymentPaypal, name="orderingPaymentPaypal"),
    path('paypal/approve_callback/', views.orderingPaymentPaypalCallback, name="orderingPaymentPaypalCallback"),
    path('paypal/webhooks/payment_received/', views.orderingPaymentPaypalWebhooksReceived, name="orderingPaymentPaypalWebhooksReceived"),
]