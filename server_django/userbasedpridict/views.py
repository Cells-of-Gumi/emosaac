from django.shortcuts import render

# Create your views here.
from userbasedpridict.parse import BookListView, ScoreListView, ReadBookListView, DataView


def index(request):
    # BookListView()
    # ReadBookListView()
    # ScoreListView()

    DataView()
    return render(request, 'userbasedpridict')