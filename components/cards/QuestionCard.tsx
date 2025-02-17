import React from 'react';

interface Props {
    question : Question;
}

const QuestionCard = ({ question: { _id,title,tags,author,upvotes,answers,views,createdAt },} : Props) => {
    return (
        <div>
            
        </div>
    );
};

export default QuestionCard;