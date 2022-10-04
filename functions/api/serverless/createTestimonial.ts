export async function main(argumentJson) {
   let url = argumentJson["requestUrl"];
   let questionMark = url.indexOf("?");
   url = url.substring(questionMark);
   let urlParams = new URLSearchParams(url);
   let title = urlParams.get("title");
   let author = urlParams.get("author");
   let authorEmail = urlParams.get("authorEmail");
   let content = urlParams.get("content");
   let labels = [];
   if (urlParams.get("label1")) {
    labels.push(urlParams.get("label1"));
   }
   if (urlParams.get("label2")) {
    labels.push(urlParams.get("label2"));
   }
   if (urlParams.get("label3")) {
    labels.push(urlParams.get("label3"));
   }
   let rating = urlParams.get("rating");
   let advisor = urlParams.get("locationId");
   let date = urlParams.get("date");
   let key = "7579d93a8ebdcbe477e3f59f50376a04";
   let conflictDetails = urlParams.get("conflictDetails");
   let compensationDetails = urlParams.get("compensationDetails");
 
   const postUrl = 'https://api.yext.com/v2/accounts/me/entities?api_key=' + key + '&entityType=ce_testimonial' + '&v=20220808';
   
	
   let data = {
    "meta": {
        "labels": [labels]
    },
    "name": title,
    "c_author": author,
    "c_authorEmail": authorEmail,
    "c_content" : content,
	"c_rating" : rating,
	"c_labels" : [labels],
	"c_location" : [advisor],
	"c_reviewDate" : date,
	"c_conflictDetails" : conflictDetails,
	"c_compensationDetails" : compensationDetails
    }
   
    const response = await fetch(postUrl, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
	    'Cache-control': 'no-cache'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
      });
   return {
  	"statusCode" : 200,
	"status": response.status
   }
}
