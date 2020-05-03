from django.shortcuts import render
from django.views.generic import ListView
from django.db.models import Q

from products.models import Product


class SearchProductView(ListView):
    template_name = "search/view.html"

    def get_queryset(self, *args, **kwargs):
        request = self.request
        method_dict = request.GET
        query = request.GET.get('q')
        if query is not None:
            return Product.objects.search(query)
        else:
            return Product.objects.features()
