from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("todos.urls")),  # 👈 send root URL to our todos app
]
