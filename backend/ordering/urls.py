from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('all/', views.getAllOrdering, name="allOrdering"),
    path('<str:pk>/', views.getOrderingById, name="orderingById"),
    path('momo/payment/', views.orderingPaymentMomo, name="orderingPaymentMomo"),
    path('momo/callback', views.orderingPaymentMomoCallback, name="orderingPaymentMomoCallback"),
    path('paypal/payment/', views.orderingPaymentPaypal, name="orderingPaymentPaypal"),
    path('paypal/callback', views.orderingPaymentPaypalCallback, name="orderingPaymentPaypalCallback"),
]
