interface SignInWithOAuthParams {
    provider: "github";
    providerAccountId: string;
    user: {
        email: string;
        name: string;
        image: string;
        username: string;
    }
}

interface AuthCredentials {
    name: string;
    username: string;
    email: string;
    password: string;
}

interface CreateQuestionParams {
    title: string;
    content: string;
    tags: string[];
}

interface EditQuestionParams extends CreateQuestionParams {
    questionId: string;
}

interface GetQuestionParams {
    questionId: string;
}

interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, "filter"> {
    tagId: string;
}

interface IncrementViewsParams {
    questionId: string;
}

interface CreateAnswerParams {
    questionId: string;
    content: string;
}

interface GetAnswersParams extends PaginatedSearchParams {
    questionId: string;
}

interface CreateVoteParams {
    targetId: string;
    tartgetType: "question" | "answer";
    voteType: "upvote" | "downvote";
}

interface UpdateVoteCountParams extends CreateVoteParams {
    change: 1 | -1;
}
