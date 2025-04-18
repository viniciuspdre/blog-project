import bcrypt from 'bcrypt';

const salt: number = 10;

const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

export { hashPassword, comparePassword };