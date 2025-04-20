import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: User = {username: '', password: '', roles: []};
  editingUser: User | null = null;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  saveUser() {
    if (this.editingUser) {
      this.userService.update(this.editingUser.id!, this.newUser).subscribe(() => {
        this.cancelEdit();
        this.loadUsers();
      });
    } else {
      this.userService.create(this.newUser).subscribe(() => {
        this.newUser = {username: '', password: '', roles: []};
        this.loadUsers();
      });
    }
  }

  editUser(user: User) {
    this.editingUser = user;
    this.newUser = {...user, password: ''}; // Don't show hashed pw
  }

  cancelEdit() {
    this.editingUser = null;
    this.newUser = {username: '', password: '', roles: []};
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => this.loadUsers());
  }

  toggleRole(role: string) {
    const idx = this.newUser.roles.indexOf(role);
    if (idx === -1) this.newUser.roles.push(role);
    else this.newUser.roles.splice(idx, 1);
  }

}
