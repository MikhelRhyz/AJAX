<%
Option Explicit

'--- Sample array of names (can be replaced with database query) ---
Dim names
names = Array("Anna","Brittany","Cinderella","Diana","Eva","Fiona","Gunda","Hege", _
              "Inga","Johanna","Kitty","Linda","Nina","Ophelia","Petunia","Amanda", _
              "Raquel","Cindy","Doris","Eve","Evita","Sunniva","Tove","Unni","Violet", _
              "Liza","Elizabeth","Ellen","Wenche","Vicky")

'--- Get query parameter q ---
Dim q
q = LCase(Trim(Request.QueryString("q")))

Dim hint
hint = ""

If q <> "" Then
    Dim i, name, qLen
    qLen = Len(q)
    
    For i = 0 To UBound(names)
        name = names(i)
        ' compare starting letters
        If LCase(Left(name, qLen)) = q Then
            If hint = "" Then
                hint = name
            Else
                hint = hint & ", " & name
            End If
        End If
    Next
End If

If hint = "" Then
    Response.Write("no suggestion")
Else
    Response.Write(hint)
End If
%>
