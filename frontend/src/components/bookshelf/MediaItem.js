import React, { useContext, useEffect, useState } from 'react';
import API from '../../api';
import { Button, useToaster } from 'rsuite';
import { UserContext } from '../../App';
import { FaSquarePlus, FaRegSquarePlus } from "react-icons/fa6";


const MediaItem = ({ item, action }) => {
  const userContext = useContext(UserContext);
  const user = userContext.user;
  const [hasLiked, setHasLiked] = useState(false);
  const toaster = useToaster();

  const handleLike = (item) => {
    if (user === null) {
      handleShowWarning();
      return;
    }

    if (hasLiked) {
      console.log('delete like');
      // bring up a confirm screen? we don't want to keep sending api calls\
      // if they hit the like button over and over
      // setHasLiked(false);
      return;
    }

    const likeValue = {
      author: user.pk,
      media: item.pk,
    };
    API.post(`/api/bookshelf/likes/`, likeValue)
      .then(res => {
        console.log(res.data);
        setHasLiked(true);
      })
      .catch(error => console.error('item like error: ', error));
  };

  const handleShowWarning = () => {
    toaster.push(warning, { placement: 'bottomStart', duration: 3000 });
    setTimeout(() => {
      toaster.clear();
    }, 5000);
  };

  const warning = (
    <div className='w-300 h-100 border-2 border-white text-white px-3 py-2 mt-4 toaster-shadow-white'>
      <p className='jetbrains-mono'>Please log in or sign up to interact <br></br> with my bookshelf!</p>
    </div>
  );

  useEffect(() => {
    if (user) {
      const checkHasLiked = item.likes?.some((like) => {
        return like.author === user.pk;
      });
      setHasLiked(checkHasLiked);
    }
  }, []);

  return (
    <div className='item-container'>
      <p>{item.title}</p>
      <p>{item.creator}</p>
      <div className='flex gap-2'>
        {hasLiked ? <FaSquarePlus size={35} /> : <FaRegSquarePlus size={35} />}
        <Button size='sm' variant='ghost' onClick={() => handleLike(item)}>
          I've {action} this!
        </Button>
      </div>
      <p>
        {item.likes.length} other people have also {action} this
      </p>
    </div>
  );
}

export default MediaItem