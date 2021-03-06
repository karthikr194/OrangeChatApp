import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'enter-code', loadChildren: './enter-code/enter-code.module#EnterCodePageModule' },
  { path: 'conversation', loadChildren: './conversation/conversation.module#ConversationPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', loadChildren: './tab5/tab5.module#Tab5PageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' }
];

import { AuthGuard } from './guard/auth.guard';
import { ReAuthGuard } from './guard/re-auth.guard';

// const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
//   { path: 'chat-room', loadChildren: './pages/chat-room/chat-room.module#ChatRoomPageModule', canActivate: [AuthGuard] },
//   { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [ReAuthGuard]},
//   { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule', canActivate: [ReAuthGuard]},
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
