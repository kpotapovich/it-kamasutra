import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/img/user.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {UsersAPI as usersAPI} from "../../api/api";

let Users = (props) => {

    let pagesCount = Math.ceil (props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    return <div>

        <div className ={styles.over}>
            {pages.map(p => {
                return (
                    <span
                        key={p}
                        className = {props.currentPage === p ? styles.selectedPage:''}
                         onClick={(e) => {
                             props.onPageChanged(p); }}>{p}
                    </span>)
                })}

        </div>
           {props.users.map(u =>
             <div key={u.id} className={styles.userText}>
                <span>
                   <div>
                      <NavLink to={'/profile'}>
                          <img src={u.photos.small != null ? u.photos.small : userPhoto}
                               className={styles.userPhoto}/>
                      </NavLink>
                   </div>
                  <div>
                      {u.followed
                      ? <button disabled={props.followingInProgress
                              .some(id => id === u.id)}
                                onClick={() => { props.unFollow(u.id);
                          }}>Unfollow</button>

                      : <button disabled={props.followingInProgress
                              .some(id => id === u.id)}
                                onClick={() => { props.follow( u.id);
                          }}>Follow</button>
                      }
                  </div>
              </span>
                <span className={styles.location}>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;