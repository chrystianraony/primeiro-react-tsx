import { format, formatDistanceToNow, set } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";
import styles from "../Post/Post.module.css";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: string;
  content: any;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setcomments] = useState(['Post muito bacana']);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' H:mm'h'", // formatando data por date-fns
    { locale: ptBR } /*Formatação da data usando date-fns*/
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    //Referente ao tempo de publicação
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setcomments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>){
    setNewCommentText(event.target.value);
    event.target.setCustomValidity('');
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Esse Campo é obrigatório!')

  }

  function deleteComment(commentToDelete: string){
    const commentsWithoutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setcomments(commentsWithoutDeleteOne);
  }



  // useEffect(() => {
  //   console.log("COMMENTS ALTERADO: ", comments.length)
  // }, [comments])

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder={true} src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      {/*Editando o conteudo que foi setado como paragrafo e link*/}
      <div className={styles.content}>
        {content.map((line) => { //line foi criado aqui
          if (line.type == "paragraph") {  //se a linha tiver um tipo paragrafo retorne o conteudo dela
            return <p key={line.content.toString()}>{line.content}</p>;
          } else if (line.type == "link") {  //senao se tiver um link retorne o conteudo do link adicionado
            return (
              <p key={line.content.toString()}><a href="#">{line.content}</a></p>
            )
          } else if (line.type == "social") {
            return (
              <div key={line.content.toString()} className={styles.socialLink}>
                {line.content.map((item : any) => {
                  return (
                    <p key={item.content.toString()}>
                      <a href={item.href}>{item.content}</a>
                    </p>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          name="comment"
          placeholder="Deixe um comentário" 
          value={newCommentText}  //dizendo para pegar o valor inicial do newCommentText, para deixar o textarea em branco
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, index) => {
          return (
            <Comment 
              key={index} 
              content={comment} 
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  );
}
