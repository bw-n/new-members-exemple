<!-- ✅ Conteneurs à placer dans ta page -->
<div id="topMembers" style="display:flex; flex-wrap:wrap; justify-content:center; gap:24px; margin-bottom:40px;"></div>
<div id="bottomMembers" style="display:flex; flex-wrap:wrap; justify-content:center; gap:24px;"></div>

<!-- ✅ Script JS avec données intégrées -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const topMembersContainer = document.getElementById('topMembers');
  const bottomMembersContainer = document.getElementById('bottomMembers');

  const allMembers = [
    {
      name: "Jane Doe",
      profession: "Blockchain Expert",
      website: "https://janedoe.com",
      email: "jane@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "John Smith",
      profession: "Cybersecurity Specialist",
      website: "https://johnsmith.com",
      email: "john@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Alice Brown",
      profession: "Web3 Developer",
      website: "https://alicebrown.com",
      email: "alice@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "David Lee",
      profession: "AI Researcher",
      website: "https://davidlee.com",
      email: "david@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Sarah Green",
      profession: "UX Designer",
      website: "https://sarahgreen.com",
      email: "sarah@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Michael Johnson",
      profession: "Smart Contract Engineer",
      website: "https://michaeljohnson.com",
      email: "michael@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Emily White",
      profession: "Data Analyst",
      website: "https://emilywhite.com",
      email: "emily@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Robert Black",
      profession: "Marketing Strategist",
      website: "https://robertblack.com",
      email: "robert@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Laura Adams",
      profession: "Finance & Crypto Expert",
      website: "https://lauraadams.com",
      email: "laura@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Chris Miller",
      profession: "Community Manager",
      website: "https://chrismiller.com",
      email: "chris@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Daniel Wilson",
      profession: "DevOps Engineer",
      website: "https://danielwilson.com",
      email: "daniel@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Olivia King",
      profession: "Cloud Architect",
      website: "https://oliviaking.com",
      email: "olivia@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "James Wright",
      profession: "Mobile Developer",
      website: "https://jameswright.com",
      email: "james@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Sophia Hall",
      profession: "Network Engineer",
      website: "https://sophiahall.com",
      email: "sophia@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "William Turner",
      profession: "Quantum Computing Researcher",
      website: "https://williamturner.com",
      email: "william@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Isabella Clark",
      profession: "Bioinformatics Specialist",
      website: "https://isabellaclark.com",
      email: "isabella@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Joseph Lewis",
      profession: "Game Developer",
      website: "https://josephlewis.com",
      email: "joseph@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Mia Young",
      profession: "Robotics Engineer",
      website: "https://miayoung.com",
      email: "mia@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Benjamin Scott",
      profession: "AR/VR Developer",
      website: "https://benjaminscott.com",
      email: "benjamin@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    },
    {
      name: "Charlotte Baker",
      profession: "Ethical Hacker",
      website: "https://charlottebaker.com",
      email: "charlotte@bwxxx.bw",
      photoUrl: "https://www.weebly.com/editor/uploads/.../logo_BW_WEB_200x200.jpg"
    }
  ];

  let rotatingMembers = [...allMembers];

  const createMemberBlock = (member) => {
    const block = document.createElement('div');
    block.style = "background:#181818; border:1px solid #00e6ff; border-radius:10px; padding:16px; width:200px; text-align:center; color:#fff; font-family:'Open Sans',sans-serif; box-shadow:0 0 15px rgba(0,230,255,0.1);";

    block.innerHTML = `
      <img src="${member.photoUrl}" alt="${member.name}" style="width:80px; height:80px; border-radius:50%; margin-bottom:12px;">
      <div style="font-size:16px; font-weight:bold; color:#00e6ff;">${member.name}</div>
      <div style="font-size:13px; margin:6px 0;">${member.profession}</div>
      <a href="${member.website}" target="_blank" style="font-size:13px; color:#00e6ff; text-decoration:none;">Site web ↗</a>
      <div style="font-size:12px; margin-top:8px; color:#aaa;">${member.email}</div>
    `;
    return block;
  };

  const updateMembersDisplay = () => {
    if (topMembersContainer) {
      topMembersContainer.innerHTML = '';
      rotatingMembers.slice(0, 4).forEach(m => topMembersContainer.appendChild(createMemberBlock(m)));
    }

    if (bottomMembersContainer) {
      bottomMembersContainer.innerHTML = '';
      rotatingMembers.slice(4).forEach(m => bottomMembersContainer.appendChild(createMemberBlock(m)));
    }

    // Rotation
    const first = rotatingMembers.shift();
    rotatingMembers.push(first);
  };

  updateMembersDisplay();
  setInterval(updateMembersDisplay, 10000); // Turnover toutes les 10s
});
</script>
