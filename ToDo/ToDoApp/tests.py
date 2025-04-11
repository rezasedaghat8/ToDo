from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Task

# تست مدل
class TaskModelTestCase(TestCase):
    def test_create_task(self):
        task = Task.objects.create(title="یادگیری تست‌نویسی")
        self.assertEqual(task.title, "یادگیری تست‌نویسی")
        self.assertFalse(task.completed)
        self.assertEqual(Task.objects.count(), 1)

# تست API
class TaskAPITestCase(APITestCase):
    def setUp(self):
        self.task = Task.objects.create(title="تسک تستی", completed=False)

    def test_list_tasks(self):
        response = self.client.get("/api/todos/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "تسک تستی")

    def test_create_task(self):
        data = {"title": "تسک جدید", "completed": False}
        response = self.client.post("/api/todos/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)

    def test_retrieve_task(self):
        url = f"/api/todos/{self.task.id}/"
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.task.title)
        self.assertEqual(response.data["completed"], self.task.completed)

    def test_update_task(self):
        url = f"/api/todos/{self.task.id}/"
        data = {"title": "تسک ویرایش‌شده", "completed": True}
        response = self.client.put(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()  # بروز رسانی از دیتابیس
        self.assertEqual(self.task.title, "تسک ویرایش‌شده")
        self.assertTrue(self.task.completed)

    def test_delete_task(self):
        url = f"/api/todos/{self.task.id}/"
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)
