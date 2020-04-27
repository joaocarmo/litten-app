const auth = jest.fn(() => ({
  onAuthStateChanged: jest.fn(() => null),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
}))

export default auth
