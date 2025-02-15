import React from 'react';

interface Props {
    _id: string;
    name: string;
    questions: number;
    showCount?: boolean;
    compack?: boolean;
}

const TagCard = ({ _id,name,questions,showCount,compack }: Props) => {
    
    return (
        <div>
            tags 
        </div>
    );
};

export default TagCard;