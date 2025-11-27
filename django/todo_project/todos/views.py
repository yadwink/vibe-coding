from django.shortcuts import render, get_object_or_404, redirect
from .models import Todo
from .forms import TodoForm

def todo_list(request):
    # handle create on the same page
    if request.method == "POST":
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("todo_list")
    else:
        form = TodoForm()

    todos = Todo.objects.order_by("is_resolved", "due_date", "created_at")
    return render(request, "home.html", {"form": form, "todos": todos})


def todo_edit(request, pk):
    todo = get_object_or_404(Todo, pk=pk)

    if request.method == "POST":
        form = TodoForm(request.POST, instance=todo)
        if form.is_valid():
            form.save()
            return redirect("todo_list")
    else:
        form = TodoForm(instance=todo)

    todos = Todo.objects.order_by("is_resolved", "due_date", "created_at")
    # reuse same template, just pass form bound to existing todo
    return render(
        request,
        "home.html",
        {
            "form": form,
            "todos": todos,
            "todo_being_edited": todo,
        },
    )


def todo_delete(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    if request.method == "POST":
        todo.delete()
        return redirect("todo_list")
    # no confirmation page, just delete on POST
    return redirect("todo_list")


def todo_toggle_resolved(request, pk):
    todo = get_object_or_404(Todo, pk=pk)
    if request.method == "POST":
        todo.is_resolved = not todo.is_resolved
        todo.save()
    return redirect("todo_list")
