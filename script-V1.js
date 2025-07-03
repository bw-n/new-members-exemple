document.addEventListener('DOMContentLoaded', () => {
  const topMembersContainer = document.getElementById('topMembers');
  const bottomMembersContainer = document.getElementById('bottomMembers');
  const membersDataUrl = 'https://cdn.jsdelivr.net/gh/bw-n/new-members-featured/members.json';

  fetch(membersDataUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(allMembers => {
      let rotatingMembers = [...allMembers];

      const createMemberBlock = (member) => {
        const photoUrl = member.photoUrl || 'https://via.placeholder.com/80';
        const block = document.createElement('div');
        block.style = "background:#181818; border:1px solid #00e6ff; border-radius:10px; padding:16px; width:200px; text-align:center; color:#fff; font-family:'Open Sans',sans-serif; box-shadow:0 0 15px rgba(0,230,255,0.1);";

        block.innerHTML = `
          <img src="${photoUrl}" alt="${member.name}" style="width:80px; height:80px; border-radius:50%; margin-bottom:12px;">
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

        const first = rotatingMembers.shift();
        rotatingMembers.push(first);
      };

      updateMembersDisplay();
      setInterval(updateMembersDisplay, 10000);
    })
    .catch(error => {
      console.error("Erreur lors du chargement des membres :", error);
      if (topMembersContainer) {
        topMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>⚠️ Membres à l'honneur non disponibles</p>";
      }
      if (bottomMembersContainer) {
        bottomMembersContainer.innerHTML = "<p style='color: red; text-align: center;'>⚠️ Nouveaux membres non disponibles</p>";
      }
    });
});
