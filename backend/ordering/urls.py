from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all/', views.getAllOrdering, name="allOrdering"),
    path('create/', views.orderingCreateNew, name="orderingCreateNew"),
    path('bill/<str:id>', views.getOrderingBill, name="getOrderingBill"),
    path('<str:pk>/', views.getOrderingById, name="orderingById"),
    
    path('momo/payment/', views.orderingPaymentMomo, name="orderingPaymentMomo"),
    path('momo/callback', views.orderingPaymentMomoCallback, name="orderingPaymentMomoCallback"),
    path('paypal/payment_creation/', views.orderingPaymentPaypal, name="orderingPaymentPaypal"),
    path('paypal/approve_callback/', views.orderingPaymentPaypalCallback, name="orderingPaymentPaypalCallback"),
    path('paypal/webhooks/payment_received/', views.orderingPaymentPaypalWebhooksReceived, name="orderingPaymentPaypalWebhooksReceived"),
    
]
