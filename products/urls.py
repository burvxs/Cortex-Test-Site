from django.urls import path, re_path
from .views import (ProductListView,
                    ProductSlugDetailView)

app_name = 'products'

urlpatterns = [
    path('', ProductListView.as_view(), name="list"),
    re_path(r'^(?P<slug>[\w-]+)/$', ProductSlugDetailView.as_view(),
            name="detail"),

]
