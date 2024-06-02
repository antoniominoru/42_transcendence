from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("game", views.game, name="home"),
    path("play", views.play, name="play")
]
