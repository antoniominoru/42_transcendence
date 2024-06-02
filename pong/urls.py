from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.get_home_page, name="home-page"),
    path("login", views.get_login_page, name="login-page"),
    path("game", views.get_game_page, name="game-page"),
    path("social", views.get_social_page, name="social-page"),
    path("stats", views.get_stats_page, name="stats-page"),
    path("tournament", views.get_tournament_page, name="tournament-page")
]
