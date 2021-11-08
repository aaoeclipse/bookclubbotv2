// module.exports = (client, categoryname)=>{
//     client.guild.channels.create(`${categoryname}`, {type: "category"});
// }
module.exports = async (client, categoryname, chapters)=>{
    await client.guild.channels.create(`${categoryname}`, {type: "category"});

    if (chapters > 30){
        console.error("fuck that shit");
        return
    }

    for (let index = 1; index <= chapters; index++) {
        client.guild.channels.create(`chapter-${index}`, {type: "text"}).then(channel => {
            let category = client.guild.channels.cache.find(c => c.name == `${categoryname}` && c.type == "category");
        
            if (!category) throw new Error("Category channel does not exist");
            channel.setParent(category.id);
          }).catch(console.error);
    }
}