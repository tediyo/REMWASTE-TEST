const bcrypt = require('bcryptjs');

async function testPassword() {
  const password = 'password123';
  const hash = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa';
  
  console.log('Testing password:', password);
  console.log('Hash:', hash);
  
  const isValid = await bcrypt.compare(password, hash);
  console.log('Password valid:', isValid);
  
  // Create a new hash for comparison
  const newHash = await bcrypt.hash(password, 10);
  console.log('New hash:', newHash);
  
  const isValidNew = await bcrypt.compare(password, newHash);
  console.log('New hash valid:', isValidNew);
}

testPassword().catch(console.error); 