from django.test import TestCase
from django.urls import reverse
from datetime import date
from .models import Todo

class TodoTests(TestCase):
    def test_create_todo(self):
        response = self.client.post(
            reverse("todo_list"),
            {
                "title": "Test TODO",
                "description": "Some description",
                "due_date": "2025-12-31",
                "is_resolved": False,
            },
        )
        self.assertEqual(Todo.objects.count(), 1)
        todo = Todo.objects.first()
        self.assertEqual(todo.title, "Test TODO")
        # redirect back to list
        self.assertEqual(response.status_code, 302)

    def test_list_todos_shows_created_items(self):
        Todo.objects.create(
            title="Existing TODO",
            description="",
            due_date=date.today(),
        )
        response = self.client.get(reverse("todo_list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Existing TODO")

    def test_edit_todo(self):
        todo = Todo.objects.create(
            title="Old title",
            description="",
            due_date=date.today(),
        )
        response = self.client.post(
            reverse("todo_edit", args=[todo.pk]),
            {
                "title": "New title",
                "description": "Updated",
                "due_date": "2025-12-31",
                "is_resolved": True,
            },
        )
        self.assertEqual(response.status_code, 302)
        todo.refresh_from_db()
        self.assertEqual(todo.title, "New title")
        self.assertTrue(todo.is_resolved)

    def test_toggle_resolved(self):
        todo = Todo.objects.create(title="Toggle me", due_date=date.today())
        self.assertFalse(todo.is_resolved)
        response = self.client.post(reverse("todo_toggle_resolved", args=[todo.pk]))
        self.assertEqual(response.status_code, 302)
        todo.refresh_from_db()
        self.assertTrue(todo.is_resolved)

    def test_delete_todo(self):
        todo = Todo.objects.create(title="Delete me", due_date=date.today())
        response = self.client.post(reverse("todo_delete", args=[todo.pk]))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(Todo.objects.count(), 0)
