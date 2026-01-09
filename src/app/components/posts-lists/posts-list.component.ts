import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PostsService, Post } from '../../services/posts.services';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
  posts: Post[] = [];
  displayedColumns: string[] = ['id', 'title', 'content', 'createdAt', 'actions'];

  constructor(private postsService: PostsService) {
    this.loadPosts();
  }

  loadPosts() {
    // CORRECCIÓN 2: Tipado explícito para 'data'
    this.postsService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  deletePost(id: number) {
    this.postsService.deletePost(id).subscribe(() => this.loadPosts());
  }
}