import requests
import json

username="rpcw2022@gmail.com"
password="2022"

#GET Token
r=requests.post("http://clav-api.di.uminho.pt/v2/users/login",
    json={"username": username, "password": password})

mytoken=r.json()["token"]

print(mytoken)



#
#    Quantos processos (nível 3) e quais são (obtem uma lista em JSON; podes concatenar sublistas invocando várias queries), pertencentes à descendência da classe 750?
#    Quantas entidades estão catalogadas?
#    Quantos processos (classes de nível 3) se encontram na descendência de 750.20?
#    Quantos processos (classes de nível 3) estão relacionados com 750.20.600?


resposta1=[]
resp = requests.get('http://clav-api.di.uminho.pt/v2/classes/c750?token='+mytoken)
for filho in resp.json()["filhos"]:
    f = requests.get('http://clav-api.di.uminho.pt/v2/classes/c'+filho["codigo"]+'?token='+mytoken)
    for filho2 in f.json()["filhos"]:
        resposta1.append(filho2["codigo"])
print("Resposta1: len="+str(len(resposta1))+", lista=",resposta1)
print()


#Pergunta2
resp = requests.get('http://clav-api.di.uminho.pt/v2/entidades?token='+mytoken)
print("Resposta2: len="+str(len(resp.json())))
print()


#Pergunta3
resp = requests.get('http://clav-api.di.uminho.pt/v2/classes/c750.20?token='+mytoken)
print("Resposta3: len="+str(len(resp.json()["filhos"])))
print()



#Pergunta4
resp = requests.get('http://clav-api.di.uminho.pt/v2/classes/c750.20.600?token='+mytoken)
print("Resposta4: len="+str(len(resp.json()["processosRelacionados"])))
print()

#print(json.dumps(resp.json(), indent=4))