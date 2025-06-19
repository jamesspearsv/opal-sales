import Modal from '../components/Modal.js';

export default function IndexView() {
  return (
    <>
      <h1>Index View</h1>
      <Modal label="Open Me!" ref="index-modal">
        I am a modal
      </Modal>
    </>
  );
}
