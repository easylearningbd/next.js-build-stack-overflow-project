import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
    title: "No Date Found",
    message: "Looks like the database is taking a nap. Wake it up with some new entries",
    button: {
        text: "Add Data",
        href: ROUTES.HOME
    },
};

export const DEFAULT_ERROR = {
    title: "Something Went Wrong",
    message: "Even our code can have a bad day. Give it another shot",
    button: {
        text: "Retry Request",
        href: ROUTES.HOME
    },
};

export const EMPTY_QUESTION = {
    title: "Ahh, No Questions Yet!",
    message: "The question board is empty. Maybe it waiting for your questions to get things rolling",
    button: {
        text: "Ask a Question",
        href: ROUTES.ASK_QUESTION
    },
};

export const EMPTY_TAGS = {
    title: "No Tags Found",
    message: "The tag could is empty. Add some keyword to make it rain",
    button: {
        text: "Create Tag",
        href: ROUTES.TAGS
    },
};

export const EMPTY_COLLECTIONS = {
    title: "Collections are Empty",
    message: "Looks like you have not created any collections yet. Start curating something extraordinary today",
    button: {
        text: "Save to Collections",
        href: ROUTES.COLLECTION
    },
};