function defaultsToLocalStorage() {
    localStorage.setItem("USER_NAME", JSON.stringify(""))
    localStorage.setItem("USER_IMG", "[]")
    localStorage.setItem("DONE_AND_DELETED_TASKS", JSON.stringify({ done: 0, deleted: 0 }));
    localStorage.setItem("TASKS", JSON.stringify(["TEST TODO APP"]));
    localStorage.setItem("IS_AUTHENTICATED", '0');
}

export default defaultsToLocalStorage