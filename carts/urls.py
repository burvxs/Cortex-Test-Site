from django.urls import path, re_path
from .views import (cart_home, 
                    cart_update,
                    checkout_home,
                    checkout_done_view
                     )

app_name = 'carts'

urlpatterns = [
    path('', cart_home, name="home"),
    path('checkout/', checkout_home, name="checkout"),
    re_path(r'^update/$', cart_update, name="update"),
    path('checkout/success/', checkout_done_view, name="success")
]
