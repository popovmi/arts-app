import { useDeleteArtCommentMutation, useUpdateArtCommentMutation, type ArtComment } from '@/graphql';
import { useToggle, useUser } from '@/shared/hooks';
import { DeleteOutlined, EditOutlined, SaveFilled } from '@ant-design/icons';
import { Comment, Input } from 'antd';
import { FC, useState } from 'react';

const { TextArea } = Input;

const ArtCommentContent: FC<{
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

export const ArtCommentView: FC<{ comment: ArtComment }> = ({ comment }) => {
    const [edit, toggleEdit] = useToggle();
    const [newContent, setNewContent] = useState<string>(comment.text);
    const { user } = useUser();

    const actions = [];

    if (user?.id === comment.author.id) {
        const [updateComment] = useUpdateArtCommentMutation();
        const updateCommentControl = edit ? (
            <SaveFilled
                onClick={() => updateComment({ id: comment.id, text: newContent }).then(() => toggleEdit())}
            />
        ) : (
            <EditOutlined onClick={() => toggleEdit()} />
        );

        const [deleteComment] = useDeleteArtCommentMutation();
        const deleteCommentControl = (
            <DeleteOutlined onClick={() => deleteComment({ id: comment.id, artId: comment.artId })} />
        );

        actions.push(updateCommentControl, deleteCommentControl);
    }

    return (
        <li>
            <Comment
                author={comment.author.fullName}
                content={
                    <ArtCommentContent
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
