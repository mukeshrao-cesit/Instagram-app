import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import './CreatePost.css';
import './Filter.css';
import { useState } from 'react';
import { UploadFile } from './UploadFile';
import { AddFilter } from './AddFilter/AddFilter';
import { CropImg } from './CropImg';

export const Create_Post = () => {
  const [isBackDropOpen, setIsBackDropOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [isStatus, setIsStatus] = useState(0);
  const [image, setImage] = useState('');

  function handleImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  function handleNewPost(className: string, caption: string) {
    const newPost = { className: className, caption: caption, image: image };
    setPost((prev): any => {
      return [newPost, ...prev];
    });
    setIsBackDropOpen((prev) => !prev);
    setIsStatus(0);
    setImage('');
  }

  function renderComp() {
    if (isStatus === 0) {
      return (
        <UploadFile
          handleImage={handleImage}
          setIsBackDropOpen={setIsBackDropOpen}
          image={image}
          setIsStatus={setIsStatus}
        />
      );
    } else if (isStatus === 1) {
      return <CropImg setIsStatus={setIsStatus} />;
    } else if (isStatus === 2) {
      return <AddFilter image={image} setIsStatus={setIsStatus} />;
    } else if (isStatus === 3) {
      return (
        <AddFilter
          handleNewPost={handleNewPost}
          image={image}
          setIsStatus={setIsStatus}
          setIsBackDropOpen={setIsBackDropOpen}
        />
      );
    }
  }
  return (
    <div>
      <div className="Create-Icon" onClick={() => setIsBackDropOpen(!isBackDropOpen)}>
        <svg
          aria-label="New post"
          className="_ab6-"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="6.545"
            x2="17.455"
            y1="12.001"
            y2="12.001"
          ></line>
          <line
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="12.003"
            x2="12.003"
            y1="6.545"
            y2="17.455"
          ></line>
        </svg>
        <p>Create</p>
      </div>
      <Modal
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isBackDropOpen}
        onClose={() => {
          setIsBackDropOpen(!isBackDropOpen);
          setIsStatus(0);
          setImage('');
        }}
      >
        <div className="create-post-overall">
          <div className="closeIcon">
            <CloseIcon
              sx={{ fontSize: '30px', marginRight: '20px', marginTop: '20px' }}
              onClick={() => {
                setIsBackDropOpen(!isBackDropOpen);
                setIsStatus(0);
                setImage('');
              }}
            />
          </div>
          <div className="CreatePost-Container">{renderComp()}</div>
        </div>
      </Modal>
      <div className="post-container">
        {post.length > 0 &&
          post.map((data: any) => {
            return (
              <div key={data.className} className="post-card">
                <img style={{ width: '200px' }} src={data.image} className={data.className} />
                <p>{data.caption}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
