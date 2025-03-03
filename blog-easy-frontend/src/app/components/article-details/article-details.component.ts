import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ArticleService} from '../../services/article/article.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Articles} from '../../interfaces/articles';

@Component({
  selector: 'app-article-details',
  imports: [],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent implements OnInit {
  articleService:ArticleService = inject(ArticleService);
  router:ActivatedRoute = inject(ActivatedRoute);
  id = Number(this.router.snapshot.paramMap.get('id'));
  article: WritableSignal<Articles | null> = signal(null);

  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(){
    this.articleService.getArticleById(this.id).subscribe(article => {
      this.article.set(article);
    });
  };





}
