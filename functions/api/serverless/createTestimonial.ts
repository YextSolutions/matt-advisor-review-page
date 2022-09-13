export async function main(argumentJson) {
   let url = argumentJson["requestUrl"];
   let questionMark = url.indexOf("?");
   url = url.substring(questionMark);
   let urlParams = new URLSearchParams(url);
   let title = urlParams.get("title");
   let author = urlParams.get("author");
   let authorEmail = urlParams.get("authorEmail");
   let content = urlParams.get("content");
   let labels = urlParams.get("labels");
   let key = "7579d93a8ebdcbe477e3f59f50376a04";
 
   const postUrl = 'https://api.yext.com/v2/accounts/me/entities?api_key=' + key + '&entityType=ce_testimonial' + '&v=20220808';
   let data = {
        "name": title,
        "c_author": author,
        "c_authorEmail": authorEmail,
        "c_content" : content,
        "c_labels" : labels
       }
   
    const response = await fetch(postUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data),
      });
   return {
      "body" : "",
      "statusCode" : 200
   }
}
