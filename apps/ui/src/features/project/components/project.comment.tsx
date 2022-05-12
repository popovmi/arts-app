import { useUpdateProjectCommentMutation, type ProjectComment } from '@/graphql';
import { useToggle, useUser } from '@/shared/hooks';
import { EditOutlined, SaveFilled } from '@ant-design/icons';
import { Comment, Input } from 'antd';
import { FC, useState } from 'react';

const { TextArea } = Input;

const ProjectCommentContent: FC<{
    edit: boolean;
    content: string;
    onContentChange: (val: string) => void;
    newContent: string;
}> = ({ edit, content, onContentChange, newContent }) => {
    if (edit) {
        return <TextArea value={newContent} onChange={(evt) => onContentChange(evt.target.value)} />;
    }
    return <>{content}</>;
};

export const ProjectCommentView: FC<{ comment: ProjectComment }> = ({ comment }) => {
    const [edit, toggleEdit] = useToggle();
    const [newContent, setNewContent] = useState<string>(comment.text);
    const { user } = useUser();

    const actions = [];

    if (user?.id === comment.author.id) {
        const [updateComment] = useUpdateProjectCommentMutation();
        const updateCommentControl = edit ? (
            <SaveFilled
                onClick={() => updateComment({ id: comment.id, text: newContent }).then(() => toggleEdit())}
            />
        ) : (
            <EditOutlined onClick={() => toggleEdit()} />
        );
        actions.push(updateCommentControl);
    }

    return (
        <li>
            <Comment
                author={comment.author.fullName}
                content={
                    <ProjectCommentContent
                        edit={edit}
                        content={comment.text}
                        onContentChange={setNewContent}
                        newContent={newContent}
                    />
                }
                actions={actions}
            />
        </li>
    );
};
