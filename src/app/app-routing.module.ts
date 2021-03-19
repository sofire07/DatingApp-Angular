import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { LoginComponent } from './components/login/login.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './.guards/auth.guard';
import { PreventUnsavedChangesGuard } from './.guards/prevent-unsaved-changes.guard';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      {path: "lists", component: ListsComponent},
      {path: "messages", component: MessagesComponent},
      {path: "member/edit", component: MemberEditComponent},
      {path: "members", component: MemberListComponent},
      {path: "members/:userName", component: MemberDetailComponent},
    ]
  },
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "server-error", component: ServerErrorComponent},
  {path: "**", component: NotFoundComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
