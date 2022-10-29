/**
 * Data Schemas
 */
const ArtObjectSchema = {
    links: {
        artobject: String,
        web: String
    },
    id: String,
    objectNumber: String,
    relation: String,
    relationDescription: String,
    cropped: Boolean,
    cropX: Number,
    cropY: Number,
    cropWidth: Number,
    cropHeight: Number,
    origWidth: Number,
    origHeight: Number,
    image: {
        guid: String,
        parentObjectNumber: String,
        cdnUrl: String,
        cropX: Number,
        cropY: Number,
        width: Number,
        height: Number,
        offsetPercentageX: Number,
        offsetPercentageY: Number
    }
}

export { ArtObjectSchema }