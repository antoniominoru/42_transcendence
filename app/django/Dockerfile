FROM python:3.12.3-bullseye AS development

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD python3 manage.py makemigrations && \
  	python3 manage.py migrate --noinput && \
  	gunicorn -c gunicorn_config.py --reload
