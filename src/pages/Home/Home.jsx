import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from '../../assets/images/image1.jpg';
import NoDataImg from '../../assets/images/image2.png';



const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    type: 'add',
    message: '',
  });

  const [allNote, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false)

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: 'edit' });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, type: '', message: '' });
  };

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      // console.log('response :' + JSON.stringify(response, null, 2));
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again'+error.message);
    }
  };

  // Delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete('/delete-note/' + noteId);
      if (response.data && !response.data.error) {
        showToastMessage('Note Deleted Successfully', 'delete');
        getAllNotes();
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again',error);
    }
  };

  //search note
   const onSearchNote = async(query)=>{
    try{
      console.log(1234)
       const response = await axiosInstance.get('/search-notes',{
        params:{query},
       })
       console.log(1234)

       if(response.data && response.data.notes){
        setIsSearch(true)
        setAllNotes(response.data.notes)
       }
       console.log(1234)

    }catch(error){
      console.log(error)
    }
   }

   const updateIsPinned = async (noteData)=>{
      const noteId = noteData._id;

      try{
        const response = await axiosInstance.put('/update-note-pinned/'+noteId ,{
       isPinned : !noteId.isPinned
        })
         if(response.data && response.data.note && response.data.note.isPinned == true){
          showToastMessage('Note pinned successfully')
          getAllNotes();
        }else{
          showToastMessage('Note unpinned successfully')
        }
      }catch(error){
        console.log(error)
      }
   }

   const handleClearSearch = ()=>{
    setIsSearch(false);
    getAllNotes()
   }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      <div className="container mx-auto">
        {allNote.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {allNote.map((items) => (
              <NoteCard
                key={items._id}
                title={items.title}
                date={items.createdOn}
                content={items.content}
                tags={items.tags}
                isPinned={items.isPinned}
                onEdit={() => handleEdit(items)}
                onDelete={() => deleteNote(items)}
                onPinNote={() => updateIsPinned(items)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={isSearch ? 'Oops! notes not found mathcing your search'
              :
              `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`}
          />
        )}
      </div>
     <button
  className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-6 bottom-6 sm:right-10 sm:bottom-10"
  onClick={() => {
    setOpenAddEditModal({ isShown: true, type: 'add', data: null });
  }}
>
  <MdAdd className="text-3xl text-white" />
</button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
        }}
        contentLabel=""
        className="w-[40%] w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 sm:p-5 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
