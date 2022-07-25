import { Header } from "./components/Header/Header";
import { Post } from "./components/Post/Post";
import { Sidebar } from "./components/Sidebar/Sidebar";

import styles from "./App.module.css";
import "./global.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/chrystianraony.png",
      name: "Chrystian Raony",
      role: "Developer",
    },
    content: [
      { type: "paragraph", content: "Fala Galera" },
      { type: "paragraph",content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀", },
      { type: "link", content: "jane.design/doctorcare" },
      { type: "social",
        content: [
          { type: "link", href: "https://facebook.com", content: "Facebook" },
          { type: "link", href: "https://instagram.com", content: "Instagram" },
          { type: "link", href: "https://linkedin.com", content: "Linkedin" },
        ],
      },
    ],
    publishedAt: new Date("2022-07-22 15:45:15"),
  },
  // {
  //   id:2,
  //   author:{
  //     avatarUrl: 'https://github.com/chrystianraony.png',
  //     name: 'chrystian Raony',
  //     role: 'Designer'
  //   },
  //   content: [
  //     {type: 'paragraph', content: 'Fala Galera'},
  //     {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
  //     {type: 'link', content: 'jane.design/doctorcare'}
  //   ],
  //   publishedAt: new Date('2022-07-21 13:45:15'),
  // }
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
