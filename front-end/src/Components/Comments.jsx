import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../AuthContext.jsx";

const Comments = ({ CrimeID }) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getComments();
  }, []);


  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };
  const getComments = async () => {
    try {
      // Replace `/api/comments` with your actual API endpoint
      const response = await axios.post('http://localhost:8080/get-comments', { CrimeID:CrimeID });
      console.log(response.data)
        if(response.data){
            setComments(response.data);
        }else{

        }

    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  const postComment = async () => {
    if (!commentText.trim()) return; // Don't post empty comments

    try {
        console.log(user)
      // Replace `/api/comments` with your actual API endpoint
      const response = await axios.post('http://localhost:8080/add-comment', { CrimeID:CrimeID,ACCOUNTID:user['ACCOUNTID'],UserComment:commentText });
        if(response.data === true){
            getComments();
        }else{

        }

        setCommentText(''); // Clear input after posting
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow flex flex-col col-span-3 w-full">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Comment Input */}
      <div className="flex mb-4">
        <input
          type="text"
          value={commentText}
          onChange={handleInputChange}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={postComment}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-r-lg"
        >
          Post
        </button>
      </div>

      {/* Comments List */} 
      <ul className="space-y-2 max-h-32 overflow-y-auto">
        {comments.map((comment, index) => (
          <li key={index} className="p-2 bg-white rounded shadow">
            {comment['FIRSTNAME']} posted: {comment['USERCOMMENT']}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;