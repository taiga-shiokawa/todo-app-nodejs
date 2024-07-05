const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editTaskDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

console.log(id);

//特定のタスクを取得する
const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, todo_name } = task;
    taskIdDOM.textContent = _id;
    taskNameDOM.value = todo_name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
};

showTask();

//タスクの編集
editTaskDOM.addEventListener("submit", async (e) => {
  e.preventDefault(); // preventDefaultでページのリロードを防ぐ
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      todo_name: taskName,
      completed: taskCompleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集に成功しました。";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
  }
});
