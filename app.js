// === Основная логика SPA ===
import { lessons } from './lessonsData.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  const loadingScreen = document.querySelector('#loading-screen');
  const sidebar = document.querySelector('#sidebar');
  const menuToggle = document.querySelector('#menu-toggle');
  const lessonMenu = document.querySelector('#lesson-menu');
  const lessonContent = document.querySelector('#lesson-content');
  const themeToggle = document.querySelector('#theme-toggle');
  const progressText = document.querySelector('#progress-text');
  const progressFill = document.querySelector('#progress-fill');

  // === Theme ===
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') document.body.classList.add('theme-dark');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    localStorage.setItem('theme', document.body.classList.contains('theme-dark') ? 'dark' : 'light');
  });

  // === Sidebar toggle ===
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });

  // === Render menu ===
  function buildMenu(){
    const ul = document.createElement('ul');
    lessons.forEach((lesson, index)=>{
      const li = document.createElement('li');
      li.textContent = `${index+1}. ${lesson.title}`;
      li.dataset.lessonId = lesson.id;
      li.addEventListener('click', ()=> loadLesson(lesson.id));
      ul.appendChild(li);
    });
    lessonMenu.innerHTML='';
    lessonMenu.appendChild(ul);
  }

  // === Load lesson ===
  function loadLesson(id){
    const lesson = lessons.find(l=>l.id===id);
    if(!lesson) return;
    document.querySelectorAll('.lesson-menu li').forEach(li=>{
      li.classList.toggle('active', li.dataset.lessonId===id);
    });
    // Markdown to HTML (simple)
    const html = marked.parse(lesson.content);
    lessonContent.innerHTML = html;
    updateProgress(id);
    sidebar.classList.add('hidden');
    window.scrollTo(0,0);
  }

  // === Update progress ===
  function updateProgress(currentId){
    let completed = JSON.parse(localStorage.getItem('completed')) || [];
    if(!completed.includes(currentId)){
      completed.push(currentId);
      localStorage.setItem('completed', JSON.stringify(completed));
    }
    const percent = Math.round(completed.length/lessons.length*100);
    progressText.textContent = `${completed.length}/${lessons.length} уроков`;
    progressFill.style.width = `${percent}%`;
  }

  // Initial
  buildMenu();
  setTimeout(()=>{
    loadingScreen.style.display='none';
    app.style.display='grid';
  }, 500);
});
