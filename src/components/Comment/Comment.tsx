import { Avatar } from '../Avatar/Avatar';
import { ThumbsUp, Trash } from "phosphor-react";
import styles from "../Comment/Comment.module.css";
import { useState } from 'react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content);
  }

  function handleLikeComment(){
    setLikeCount((state) => {
      return state + 1
    });
  }

  return (
    <div className={styles.comment}>
     <Avatar hasBorder={false} src="https://github.com/chrystianraony.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Chrystian Raony Perazzoli</strong>
              <time title="22 de Julho às 10:35" dateTime="2022-07-22 10:35:00">Cerca de 1h atrás</time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar Comentário">
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>

        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
