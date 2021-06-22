import { request } from "./api-utils.js";
import { getCurrentUser } from "./state-utils.js";

const cronjobsURL = "http://localhost/scripts/cronjobs/cronjobs-list.sh";
const createTaskURL = "http://localhost/scripts/cronjobs/cronjobs-create.sh";
const deleteTaskURL = "http://localhost/scripts/cronjobs/cronjobs-delete.sh";

export async function fetchCronjobs() {
    const res = await request({
        url: cronjobsURL,
        method: "GET",
    });

    if (res.isSuccessful) {
        return res.data.tasks;
    } else {
        return [];
    }
}

function getBodyTextData(values, ...props) {
    let postData = `creator:${props.creator};`;
    postData += `minutes:${values.minutes};`;
    postData += `hour:${values.hour};`;
    postData += `monthDay:${values.monthDay};`;
    postData += `month:${values.month};`;
    postData += `weekDay:${values.weekDay};`;
    postData += `task:${values.task}`;
    return postData;
}

export async function createTask(values) { 
    const creator = await getCurrentUser();
    const postData = getBodyTextData(values, creator);

    const res = await request({
        url: createTaskURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}

export async function removeTask(values) {
    const creator = await getCurrentUser();
    const postData = getBodyTextData(values, creator);

    const res = await request({
        url: deleteTaskURL,
        method: "POST",
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain',
        },
        body: postData
    });

    return res;
}