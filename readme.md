# File service API.
This API provides endpoints to acess the files of server. We create new folders, donwload and upload files. 


## installation 

```bash
npm install 
```

## Tests

```bash
npx jest
```


## Build and run 

```bash
npm start
```

#### app will start http://localhost:5555

___
# Resources

### StatusController

Path: */status*

#### Check

Path: */check*

Verb: *Get*


Response:
```json
{status : string}
```

### FileController

Path: */fs*

#### GetDefaultDir

Path: */default-dir*

Verb: *Get*


Response:
```json
string
```




#### GetAllFiles

Path: */files*

Verb: *Get*

Argumenst: folder : string

Response:
```json
[string]
```

#### GetAllFolders

Path: */folders*

Verb: *Get*

Argumenst: folder : string

Response:
```json
[string]
```



#### DownloadFile

Path: */download*

Verb: *Get*

Argumenst: file : string




#### UploadloadFile

Path: */upload*

Verb: *Post*

Argumenst: [folder : string, filename : string, file : file]

Response:
```json
{ created : boolean, message : string}
```

