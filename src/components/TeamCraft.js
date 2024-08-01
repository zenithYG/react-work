import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './TeamCraft.css';
import { updateTeam } from './UpdateData';
/// 입력 필드 만들기 
/// 인원을 적음 특정 ( 이름, 연차, 성별, 조직 )
/// 만들 팀 조건, 인원수, 성별섞기, 연차 무시,
/// 

const initialData = [
    { id: 1, name: '', years: '', gender: '', organization: '' }
];

const TeamCraft = () => {
    const [user, setUser] = useState(null);
    const [rows, setRows] = useState(initialData);
    const [newRow, setNewRow] = useState({ id: null, name: '', years: '', gender: '', organization: '' });
    const handleAddRow = () => {
        if (newRow.name && newRow.years && newRow.gender && newRow.organization) {
            setRows([...rows, { ...newRow, id: rows.length + 1 }]);
            setNewRow({ id: null, name: '', years: '', gender: '', organization: '' });
          }
    };

    const fetchTeam = async (uid) => {
        const docRef = doc(db, 'Users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const team = docSnap.data().team;
            const teamWithIds = team.map((member, index) => ({ id: index + 1, ...member }));
            setRows(teamWithIds);
        } else {
          console.log('No such document!');
        }
      };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user);
            fetchTeam(user.uid)
          }
        });
    
        return () => unsubscribe();
      }, []);

    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleComplete = () => {
        const team = rows.map(({ name, years, gender, organization }) => ({
            name,
            years,
            gender,
            organization
        }));
        updateTeam(user, team, updateTeamCallback)
    };

    const updateTeamCallback = () => {
        alert('successfully!');
        // 데이터 업데이트 
    }

    return (
    <div className="container">
      <h1>인원 입력</h1>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>연차</th>
            <th>성별</th>
            <th>조직</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.years}</td>
              <td>{row.gender}</td>
              <td>{row.organization}</td>
              <td>
                <button onClick={() => handleDeleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                value={newRow.name}
                onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
                maxLength="20"
              />
            </td>
            <td>
              <input
                type="number"
                value={newRow.years}
                onChange={(e) => setNewRow({ ...newRow, years: e.target.value })}
                max="9999"
              />
            </td>
            <td>
              <select
                value={newRow.gender}
                onChange={(e) => setNewRow({ ...newRow, gender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="남">남</option>
                <option value="여">여</option>
              </select>
            </td>
            <td>
              <select
                value={newRow.organization}
                onChange={(e) => setNewRow({ ...newRow, organization: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
                <option value="React">React</option>
                <option value="ETC">ETC</option>
              </select>
            </td>
            <td>
              <button onClick={handleAddRow}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="complete-button" onClick={handleComplete}>완료</button>
    </div>
  );
};

export default TeamCraft;
