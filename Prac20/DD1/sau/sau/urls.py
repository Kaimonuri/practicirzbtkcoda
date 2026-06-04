from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse


def home(request):
    return HttpResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Prac20</title>

        <style>
            *{
                margin:0;
                padding:0;
                box-sizing:border-box;
                font-family:Arial,sans-serif;
            }

            body{
                background:linear-gradient(135deg,#1e3c72,#2a5298);
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
            }

            .card{
                background:white;
                padding:40px;
                width:450px;
                border-radius:20px;
                text-align:center;
                box-shadow:0 10px 30px rgba(0,0,0,.3);
            }

            h1{
                color:#2a5298;
                margin-bottom:20px;
            }

            p{
                color:#666;
                margin-bottom:25px;
            }

            .btn{
                display:inline-block;
                padding:12px 24px;
                background:#2a5298;
                color:white;
                text-decoration:none;
                border-radius:10px;
            }

            .btn:hover{
                background:#1e3c72;
            }
        </style>

    </head>
    <body>

        <div class="card">
            <h1>Успешный вход</h1>

            <p>
                Добро пожаловать в систему авторизации Django Allauth
            </p>

            <a class="btn" href="/accounts/logout/">
                Выйти
            </a>
        </div>

    </body>
    </html>
    """)


urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
]