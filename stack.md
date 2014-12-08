###Data, Javascript and visuals
***
####Ivan Kryukov
#####_December 8, 2014_

---
###Bioinformatics sucks
- Too much data
- Too little time
___
###Data analysis does not have to be heard
- We are not the only ones with the issues
- We should come together as a community
- We should focus more on our tools being accessible

___
###Multiple sequence alignment formats

EMBL, GenBank, Fasta(Pearson), Clustal/ALN, ACEDB, BLAST, DNAStrider, FlatFeat/FFF, GCG, GFF, IG/Stanford, MSF, NBRF, PAUP/NEXUS, Phylip(Phylip4), Phylip3.2
___


###Phylogeny formats

Newick, NEXUS, clustal, phyloxml, nexml, cdao

---

###JSON format

```javascript
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25,
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10021-3100"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    }
  ]
}
```
___
###Phylogenies in JSON

```javascript
{"name":"root","length":0,"children":
    [{"name":"C","length":0.3},
    {"name":"internal","length":0.2,"children":
        [{"name":"A","length":0.1},
		{"name":"B","length":0.2}]}]}
```
![small-tree](small-tree.png)

___
###Why JSON
- Name
- `C` - [Jansson](http://www.digip.org/jansson/)
- `perl` - [JSON](http://search.cpan.org/~makamaka/JSON-2.90/lib/JSON.pm)
- `python` - [Standard](https://docs.python.org/2/library/json.html)
- `javascript`
```javascript
JSON.parse('in.json');
```
