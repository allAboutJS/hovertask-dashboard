import { createSlice, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { Task } from "../../../types";

const tasksSlice = createSlice<
  { value: Task[] | null },
  SliceCaseReducers<{ value: Task[] | null }>,
  string,
  SliceSelectors<{ value: Task[] | null }>,
  string
>({
  name: "tasks",
  initialState: {
    value: [
      {
        id: "1",
        user_id: 1,
        title: "First Update",
        social_media_url: null,
        description: "We are testing the full task update process.",
        platforms: "X",
        task_amount: 500,
        task_type: 1,
        task_count_total: 10,
        task_count_remaining: 5,
        priority: "high",
        start_date: "2025-03-01",
        due_date: "2025-03-10",
        type_of_comment: null,
        religion: null,
        payment_per_task: null,
        no_of_participants: null,
        location: null,
        gender: null,
        status: "pending",
        completed: "Available",
        created_at: "2025-02-25T18:13:20.000000Z",
        updated_at: "2025-03-03T19:50:30.000000Z",
        completion_percentage: 50,
        posted_status: "old",
        category: "social_media"
      },
      {
        id: "2",
        user_id: 2,
        title: "Market Research",
        social_media_url: "https://socialmedia.com/research",
        description: "Conducting research on the latest trends in the market.",
        platforms: "Web, Mobile",
        task_amount: 1000,
        task_type: 2,
        task_count_total: 20,
        task_count_remaining: 12,
        priority: "medium",
        start_date: "2025-03-05",
        due_date: "2025-03-15",
        type_of_comment: "Survey feedback",
        religion: null,
        payment_per_task: 10,
        no_of_participants: 50,
        location: "Online",
        gender: null,
        status: "in-progress",
        completed: "Not Available",
        created_at: "2025-02-28T12:45:10.000000Z",
        updated_at: "2025-03-04T14:30:40.000000Z",
        completion_percentage: 60,
        posted_status: "new",
        category: "video_marketing"
      },
      {
        id: "3",
        user_id: 3,
        title: "App Update",
        social_media_url: "https://socialmedia.com/appupdate",
        description: "Updating the app to fix bugs and add new features.",
        platforms: "Mobile",
        task_amount: 300,
        task_type: 1,
        task_count_total: 15,
        task_count_remaining: 10,
        priority: "high",
        start_date: "2025-03-02",
        due_date: "2025-03-08",
        type_of_comment: null,
        religion: null,
        payment_per_task: 5,
        no_of_participants: 10,
        location: "Remote",
        gender: "Any",
        status: "completed",
        completed: "Available",
        created_at: "2025-02-24T10:20:00.000000Z",
        updated_at: "2025-03-02T18:00:00.000000Z",
        completion_percentage: 100,
        posted_status: "old",
        category: "micro_influence"
      },
      {
        id: "4",
        user_id: 4,
        title: "Customer Support",
        social_media_url: null,
        description: "Providing customer support for issues with product registration.",
        platforms: "Web",
        task_amount: 200,
        task_type: 3,
        task_count_total: 50,
        task_count_remaining: 45,
        priority: "low",
        start_date: "2025-03-06",
        due_date: "2025-03-20",
        type_of_comment: "Issue resolution",
        religion: null,
        payment_per_task: 2,
        no_of_participants: 20,
        location: "Office",
        gender: null,
        status: "pending",
        completed: "Not Available",
        created_at: "2025-03-01T09:15:45.000000Z",
        updated_at: "2025-03-04T11:00:30.000000Z",
        completion_percentage: 25,
        posted_status: "new",
        category: "promotion"
      },
      {
        id: "5",
        user_id: 5,
        title: "Product Testing",
        social_media_url: "https://socialmedia.com/producttesting",
        description: "Testing new features of the product before launch.",
        platforms: "Web, Mobile",
        task_amount: 100,
        task_type: 2,
        task_count_total: 30,
        task_count_remaining: 15,
        priority: "medium",
        start_date: "2025-03-07",
        due_date: "2025-03-14",
        type_of_comment: null,
        religion: null,
        payment_per_task: 20,
        no_of_participants: 50,
        location: "Remote",
        gender: "Any",
        status: "in-progress",
        completed: "Not Available",
        created_at: "2025-02-28T16:30:20.000000Z",
        updated_at: "2025-03-05T13:45:50.000000Z",
        completion_percentage: 40,
        posted_status: "new",
        category: "telegram"
      }
    ]
  },
  reducers: {
    setTasks(state, action: { payload: Task[] }) {
      state.value = action.payload;
    }
  }
});

export const { logout, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
